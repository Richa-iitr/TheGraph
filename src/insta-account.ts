import {
  Address,
  BigInt,
  Bytes,
  dataSource,
  log,
} from "@graphprotocol/graph-ts";
import {
  InstaAccountModified,
  LogDisableUser,
  LogEnableUser,
  LogDisable,
  LogEnable,
} from "../generated/templates/InstaAccountModified/InstaAccountModified";
import { User } from "../generated/schema";
import { createOrLoadUser } from "./insta-index";

export function handleLogEnableUser(event: LogEnableUser): void {
  // event LogEnableUser(address indexed user); --> v2

  let context = dataSource.context();
  let dsaId = Bytes.fromHexString(context.getString("dsa"));

  log.info("transaction hash: {} and from: {} ", [
    event.transaction.hash.toHexString(),
    event.transaction.from.toHexString(),
  ]);
  log.info("ID: {}", [dsaId.toHexString()]);

  let user = createOrLoadUser(event.params.user.toHexString());

  user.address = event.params.user;
  let dsas = user.dsas;
  let index = dsas.indexOf(dsaId, 0);
  if (index != -1) {
    dsas.push(dsaId);
    user.dsas = dsas;
    user.count = user.count.plus(BigInt.fromI32(1));
  }

  user.save();
}

export function handleLogDisableUser(event: LogDisableUser): void {
  // event LogDisableUser(address indexed user);  --> v2

  let context = dataSource.context();
  let id = context.getString("dsa");

  log.info("transaction hash: {} and from: {} ", [
    event.transaction.hash.toHexString(),
    event.transaction.from.toHexString(),
  ]);
  log.info("ID: {}", [id]);

  let user = User.load(id);
  if (user == null) {
    log.info("User-doesn't-exist: ", [id]);
    return;
  }

  user.address = event.params.user;
  let dsas = user.dsas;
  let removeIndex = dsas.indexOf(Bytes.fromHexString(id), 0);
  if (removeIndex != -1) {
    dsas.splice(removeIndex, 1);
    user.count = user.count.minus(BigInt.fromI32(1));
  }
  user.dsas = dsas;

  user.save();
}

export function handleEnableUser(event: LogEnable): void {
  // event LogEnable(address indexed user); --> v1

  let context = dataSource.context();
  let dsaId = Bytes.fromHexString(context.getString("dsa"));

  log.info("transaction hash: {} and from: {} ", [
    event.transaction.hash.toHexString(),
    event.transaction.from.toHexString(),
  ]);
  log.info("ID: {}", [dsaId.toHexString()]);

  let user = createOrLoadUser(event.params.user.toHexString());

  user.address = event.params.user;
  let dsas = user.dsas;
  let index = dsas.indexOf(dsaId, 0);
  if (index != -1) {
    dsas.push(dsaId);
    user.dsas = dsas;
    user.count = user.count.plus(BigInt.fromI32(1));
  }
  user.save();
}

export function handleDisableUser(event: LogDisable): void {
  // event LogDisable(address indexed user);  --> v1

  let context = dataSource.context();
  let id = context.getString("dsa");

  log.info("transaction hash: {} and from: {} ", [
    event.transaction.hash.toHexString(),
    event.transaction.from.toHexString(),
  ]);
  log.info("ID: {}", [id]);

  let user = User.load(id);
  if (user == null) {
    log.info("User-doesn't-exist: ", [id]);
    return;
  }

  user.address = event.params.user;
  let dsas = user.dsas;
  let removeIndex = dsas.indexOf(Bytes.fromHexString(id), 0);
  if (removeIndex != -1) {
    dsas.splice(removeIndex, 1);
    user.count = user.count.minus(BigInt.fromI32(1));
  }
  user.dsas = dsas;

  user.save();
}
