import { Serial } from 'type-core';
import { Task } from 'kpo';
import { Riseup } from '@riseup/utils';
import {
  ToolingConfigure,
  ToolingOptions,
  ToolingReconfigure,
  ToolingTasks
} from '@riseup/tooling';
import {
  UniversalConfigure,
  UniversalOptions,
  UniversalReconfigure,
  UniversalTasks
} from '@riseup/universal';
import { TarballParams, DistributeParams, DocsParams } from './tasks';
import { ConfigurePikaParams, ConfigureTypedocParams } from './configure';
import { LibraryGlobalParams } from './global';

export interface LibraryParams {
  global?: LibraryGlobalParams;
  build?: ConfigurePikaParams;
  tarball?: TarballParams;
  distribute?: DistributeParams;
  docs?: ConfigureTypedocParams & DocsParams;
}

export type LibraryOptions = LibraryParams & UniversalOptions & ToolingOptions;

export type LibraryReconfigure = UniversalReconfigure &
  ToolingReconfigure & {
    pika?: Serial.Array | Riseup.Reconfigure<Serial.Array>;
    typedoc?: Serial.Object | Riseup.Reconfigure<Serial.Object>;
  };

export type LibraryConfigure = UniversalConfigure &
  ToolingConfigure & {
    pika: Riseup.Configure<Serial.Array>;
    typedoc: Riseup.Configure<Serial.Object>;
  };

export type LibraryTasks = UniversalTasks &
  ToolingTasks & {
    build: Task;
    tarball: Task;
    distribute: Task;
    docs: Task;
  };
