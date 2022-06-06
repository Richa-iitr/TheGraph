import {
  Address,
  BigInt,
  Bytes,
  DataSourceContext,
} from "@graphprotocol/graph-ts";
import {
  InstaIndex,
  LogAccountCreated,
  LogNewAccount,
} from "../generated/InstaIndex/InstaIndex";
import { InstaList } from "../generated/InstaList/InstaList";
import { InstaAccount } from "../generated/undefined/InstaAccount";
import { Dsa, User } from "../generated/schema";
import { InstaAccountModified } from "../generated/templates";

export function handleLogAccountCreated(event: LogAccountCreated): void {
  // event LogAccountCreated(address sender, address indexed owner, address indexed account, address indexed origin);

  let context = new DataSourceContext();
  context.setString("dsa", event.params.account.toHexString());
  InstaAccountModified.createWithContext(event.params.account, context);
  //binding the contracts
  let contract = InstaIndex.bind(event.address);
  let instaAccount = InstaAccount.bind(event.params.account);
  let instaList = InstaList.bind(contract.list());
  let accountId = instaList.accountID(event.params.account);

  let dsa = Dsa.load(event.params.account.toHexString());
  if (dsa == null) {
    dsa = new Dsa(event.params.account.toHexString());
    dsa.auths = [];
  }

  dsa.owner = event.params.owner;
  dsa.address = event.params.account;
  dsa.version = instaAccount.version();
  dsa.accountID = accountId;

  let owners = dsa.auths;
  owners.push(event.params.owner);
  dsa.auths = owners;

  dsa.save();
}
