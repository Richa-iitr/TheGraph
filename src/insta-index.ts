import { BigInt } from "@graphprotocol/graph-ts";
import {
  InstaIndex,
  LogAccountCreated,
  LogNewAccount
} from "../generated/InstaIndex/InstaIndex";
import { Dsa } from "../generated/schema";

export function handleLogAccountCreated(event: LogAccountCreated): void {
  // event LogAccountCreated(address sender, address indexed owner, address indexed account, address indexed origin);
  let dsa = Dsa.load(event.params.account.toHexString());
  if (dsa == null) {
    dsa = new Dsa(event.params.account.toHexString());
  }
  dsa.owner = event.params.owner;
  dsa.address = event.params.account;
  let contract = InstaIndex.bind(event.address);
  dsa.version = contract.versionCount();
  dsa.save();
}
