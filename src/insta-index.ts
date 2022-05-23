import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
  InstaIndex,
  LogAccountCreated,
  LogNewAccount,
} from "../generated/InstaIndex/InstaIndex";
import { InstaList } from "../generated/InstaList/InstaList";
import { InstaAccount } from "../generated/undefined/InstaAccount";
import { Dsa } from "../generated/schema";

export function handleLogAccountCreated(event: LogAccountCreated): void {
  // event LogAccountCreated(address sender, address indexed owner, address indexed account, address indexed origin);

  let contract = InstaIndex.bind(event.address);
  let instaAccount = InstaAccount.bind(event.params.account);
  let instaList = InstaList.bind(contract.list());
  let accountId = instaList.accountID(event.params.account);

  let dsa = Dsa.load(event.transaction.from.toHexString());
  if (dsa == null) {
    dsa = new Dsa(event.transaction.from.toHexString());
    dsa.auths = [];
  }

  dsa.owner = event.params.owner;
  dsa.address = event.params.account;
  dsa.version = instaAccount.version();
  dsa.accountID = accountId;

  let owners = dsa.auths;
  // let accountLink = instaList.accountLink(dsa.accountID);
  // let next = accountLink.getFirst();
  // let last = accountLink.getLast();
  // let num_of_owners: BigInt = accountLink.getCount();

  // let i: BigInt = BigInt.fromI32(1);
  // while (true) {
  //   owners.push(next);
  //   num_of_owners.minus(BigInt.fromI32(1));
  //   if (next == last || num_of_owners.equals(BigInt.fromI32(0))) {
  //     break;
  //   }
  //   next = instaList.accountList(dsa.accountID, next).getNext();
  // }
  owners.push(event.params.owner);
  dsa.auths = owners;

  dsa.save();
}
