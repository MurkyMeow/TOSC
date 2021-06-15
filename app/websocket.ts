import { Router, Request } from 'express';
import { asyncHandler, responseOf, sanitize } from '@restless/restless';
import { SchemaResult, Schema, asString, asObject } from '@restless/sanitizers';

import { createRoom, deleteRoom, getRoomInfo, leaveRoom } from './room';

function handler<T, R>(
  sanitizer: (data: unknown, req: Request) => SchemaResult<Schema<T>>,
  handler: (args: T) => R
) {
  return asyncHandler(sanitizer, (args) => responseOf(handler(args as any)));
}

const userSanitizer = asObject({
  id: asString,
  avatar: asString,
  name: asString,
  pronoun: asString,
  tosc: asString,
});

const router = Router();

router.post('/create', handler(sanitize({}), createRoom));
router.get(
  '/info',
  handler(
    sanitize({
      query: asObject({ id: asString }),
    }),
    getRoomInfo
  )
);
router.post(
  '/join',
  handler(
    sanitize({
      query: asObject({ id: asString }),
      body: asObject({ user: userSanitizer }),
    }),
    getRoomInfo
  )
);
router.post(
  '/leave/:id',
  handler(
    sanitize({
      query: asObject({ id: asString }),
      body: asObject({ token: asString }),
    }),
    leaveRoom
  )
);
router.post(
  '/delete',
  handler(
    sanitize({
      query: asObject({ id: asString }),
    }),
    deleteRoom
  )
);

export default router;
