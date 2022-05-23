import { Address, BigInt, Bytes, log } from "@graphprotocol/graph-ts";
import {
  InstaList,
  AddAuthCall as AddAuth,
  RemoveAuthCall as RemoveAuth,
} from "../generated/InstaList/InstaList";
import { Dsa } from "../generated/schema";

export function handleAddAuth(call: AddAuth): void {
  let id = call.transaction.from.toHexString();
  log.info("transaction Hash: ", [call.transaction.hash.toHexString()]);
  let dsa = Dsa.load(id);
  if (dsa == null) {
    dsa = new Dsa(id);
    dsa.auths = [];
    dsa.owner = call.transaction.from;
    dsa.address = new Address(0);
    dsa.version = BigInt.fromI32(0);
    dsa.accountID = BigInt.fromI32(0);
  }
  let owners = dsa.auths;
  owners.push(call.inputs._owner);
  dsa.auths = owners;
  dsa.save();
}

export function handleRemoveAuth(call: RemoveAuth): void {
  let id = call.transaction.from.toHexString();
  let dsa = Dsa.load(id);
  if (dsa == null) {
    // dsa = new Dsa(id);
    // dsa.auths = [call.inputs._owner];
    // dsa.owner = call.transaction.from;
    // dsa.address = new Address(0);
    // dsa.version = BigInt.fromI32(0);
    // dsa.accountID = BigInt.fromI32(0);
    log.info("DSA-doesn't-exist: ", [id]);
    return;
  }
  let owners = dsa.auths;
  let removeIndex = owners.indexOf(call.inputs._owner, 0);
  if (removeIndex != -1) {
    owners.splice(removeIndex, 1);
  }
  dsa.auths = owners;
  dsa.save();
}
