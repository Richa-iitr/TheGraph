import { Address, BigInt, Bytes, log } from "@graphprotocol/graph-ts";
import {
  InstaList,
  AddAuthCall as AddAuth,
  RemoveAuthCall as RemoveAuth,
} from "../generated/InstaList/InstaList";
import { Dsa } from "../generated/schema";

export function handleAddAuth(call: AddAuth): void {
  let id = call.to.toHexString();
  log.info("call address: {} ", [call.to.toHexString()]);
  log.info("transaction Hash: {}", [call.transaction.hash.toHexString()]);
  log.info("transaction from: {}", [call.to.toHexString()]);
  let dsa = Dsa.load(id);
  if (dsa == null) {
    // dsa = new Dsa(id);
    // dsa.auths = [];
    // dsa.owner = call.inputs._owner;
    // dsa.address = call.transaction.from;
    // dsa.version = BigInt.fromI32(0);
    // dsa.accountID = BigInt.fromI32(0);
    log.info("No dsa found, id: {}", [id]);
    return;
  }
  let owners = dsa.auths;
  let index = owners.indexOf(call.inputs._owner);
  if (index == -1) {
    owners.push(call.inputs._owner);
  }
  dsa.auths = owners;
  dsa.save();
}

export function handleRemoveAuth(call: RemoveAuth): void {
  let id = call.to.toHexString();
  log.info("call address: {} ", [call.to.toHexString()]);
  log.info("transaction Hash: {}", [call.transaction.hash.toHexString()]);
  log.info("call from: {}", [call.from.toHexString()]);
  let dsa = Dsa.load(id);
  if (dsa == null) {
    log.info("DSA-doesn't-exist: {}", [id]);
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
