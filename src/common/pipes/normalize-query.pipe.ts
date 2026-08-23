import { Injectable, PipeTransform } from '@nestjs/common';
import { stripAccents } from '@common/utils/strip-accents';

@Injectable()
export class NormalizeQueryPipe
  implements PipeTransform<string | undefined, string | undefined>
{
  transform(value: string | undefined): string | undefined {
    if (typeof value === 'string') {
      return stripAccents(value.trim()) || undefined;
    }
    return value;
  }
}
