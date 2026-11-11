# @mechanical/workflows-development

An ordinary asynchronous function composed from four typed application-owned callbacks. The package has no direct dependency on Forge, Furnace, HyperUnix, ReactiveFiber, Library, or an agent SDK. Those clients may be used behind the injected callbacks.

This **does not** implement live development, review, multi-writer isolation, or durable execution. It is a narrow executable scaffold to measure SDK composition. The caller owns all clients and lifecycle decisions.

```ts
import { develop } from "@mechanical/workflows-development";
const outcome = await develop(
  { discover, compileContext, implement, verify },
  { task: "Fix a bug", workspaceId: "workspace", baseRevision: "base" },
);
```

The function rejects invalid input before any callbacks, requires complete discovery coverage before implementation, refuses stale/mismatched bases, and cannot emit `verified_candidate` without an established verification reference. See [programming model](../../docs/04-public-programming-model.md).
