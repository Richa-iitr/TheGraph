import { BigInt, DataSourceContext } from "@graphprotocol/graph-ts";
import {
  InstaIndex,
  LogAccountCreated,
} from "../generated/InstaIndex/InstaIndex";
import { InstaList } from "../generated/InstaIndex/InstaList";
import { InstaAccount } from "../generated/InstaIndex/InstaAccount";
import { InstaAccountModified } from "../generated/templates";
import { User } from "../generated/schema";

export function handleLogAccountCreated(event: LogAccountCreated): void {
  // event LogAccountCreated(address sender, address indexed owner, address indexed account, address indexed origin);

  let context = new DataSourceContext();
  context.setString("dsa", event.params.account.toHexString());
  InstaAccountModified.createWithContext(event.params.account, context);

  let contract = InstaIndex.bind(event.address);
  let instaAccount = InstaAccount.bind(event.params.account);
  let instaList = InstaList.bind(contract.list());
  let accountId = instaList.accountID(event.params.account);

  let user = createOrLoadUser(event.params.owner.toHexString());

  user.address = event.params.owner;
  user.save();
}

export function createOrLoadUser(id: string): User {
  let user = User.load(id);
  if (user == null) {
    user = new User(id);
    user.count = BigInt.fromI32(0);
    user.dsas = [];
  }
  return user;
}
