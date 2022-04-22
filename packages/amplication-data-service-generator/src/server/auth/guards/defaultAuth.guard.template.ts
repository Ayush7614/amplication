import { Reflector } from "@nestjs/core";
import { ExecutionContext, Injectable } from "@nestjs/common";
// @ts-ignore
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";

declare class GUARD {
  canActivate(context: ExecutionContext): boolean | Promise<boolean>;
}

@Injectable()
export class DefaultAuthGuard extends GUARD {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler()
    );

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
}
