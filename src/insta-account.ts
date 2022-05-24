import { Address, BigInt, Bytes, log } from "@graphprotocol/graph-ts";
import {
  InstaAccountModified,
  LogDisableUser,
  LogEnableUser,
  LogDisable,
  LogEnable,
} from "../generated/InstaAccountModified/InstaAccountModified";
import { Dsa } from "../generated/schema";

export function handleLogEnableUser(event: LogEnableUser): void {
  let to = event.transaction.to;
  log.info("transaction hash: {} and from: {} ", [
    event.transaction.hash.toHexString(),
    event.transaction.from.toHexString(),
  ]);
  if (!to) {
    to = event.address;
    log.info("event.address: {}", [event.address.toHexString()]);
  } else {
    log.info("to: {} ", [to.toHexString()]);
  }
  let id = to.toHexString();
  log.info("transaction Hash: ", [event.transaction.hash.toHexString()]);
  let dsa = Dsa.load(id);
  if (dsa == null) {
    dsa = new Dsa(id);
    dsa.auths = [];
    dsa.owner = event.params.user;
    dsa.address = event.transaction.from;
    dsa.version = BigInt.fromI32(0);
    dsa.accountID = BigInt.fromI32(0);
  }
  let owners = dsa.auths;
  let index = owners.indexOf(event.params.user);
  if (index == -1) {
    owners.push(event.params.user);
  }
  dsa.auths = owners;
  dsa.save();
}

export function handleLogDisableUser(event: LogDisableUser): void {
  let to = event.transaction.to;
  log.info("transaction hash: {} and from: {} ", [
    event.transaction.hash.toHexString(),
    event.transaction.from.toHexString(),
  ]);
  if (!to) {
    to = event.address;
    log.info("event.address: {}", [event.address.toHexString()]);
  } else {
    log.info("to: {} ", [to.toHexString()]);
  }
  let id = to.toHexString();
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
  let removeIndex = owners.indexOf(event.params.user, 0);
  if (removeIndex != -1) {
    owners.splice(removeIndex, 1);
  }
  dsa.auths = owners;
  dsa.save();
}

export function handleEnableUser(event: LogEnable): void {
  let to = event.transaction.to;
  log.info("transaction hash: {} and from: {} ", [
    event.transaction.hash.toHexString(),
    event.transaction.from.toHexString(),
  ]);
  if (!to) {
    to = event.address;
    log.info("event.address: {}", [event.address.toHexString()]);
  } else {
    log.info("to: {} ", [to.toHexString()]);
  }
  let id = to.toHexString();
  log.info("transaction Hash: ", [event.transaction.hash.toHexString()]);
  let dsa = Dsa.load(id);
  if (dsa == null) {
    dsa = new Dsa(id);
    dsa.auths = [];
    dsa.owner = event.params.user;
    dsa.address = event.transaction.from;
    dsa.version = BigInt.fromI32(0);
    dsa.accountID = BigInt.fromI32(0);
  }
  let owners = dsa.auths;
  let index = owners.indexOf(event.params.user);
  if (index == -1) {
    owners.push(event.params.user);
  }
  dsa.auths = owners;
  dsa.save();
}

export function handleDisableUser(event: LogDisable): void {
  let to = event.transaction.to;
  log.info("transaction hash: {} and from: {} ", [
    event.transaction.hash.toHexString(),
    event.transaction.from.toHexString(),
  ]);
  if (!to) {
    to = event.address;
    log.info("event.address: {}", [event.address.toHexString()]);
  } else {
    log.info("to: {} ", [to.toHexString()]);
  }
  let id = to.toHexString();
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
  let removeIndex = owners.indexOf(event.params.user, 0);
  if (removeIndex != -1) {
    owners.splice(removeIndex, 1);
  }
  dsa.auths = owners;
  dsa.save();
}
