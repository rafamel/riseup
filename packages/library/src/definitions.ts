import { Serial } from 'type-core';
import { Task } from 'kpo';
import { BuildParams, DistributeParams, DocsParams } from './tasks';
import { ConfigurePikaParams, ConfigureTypedocParams } from './configure';
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

export interface LibraryParams {
  build?: ConfigurePikaParams & BuildParams;
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
    docs: Task;
    distribute: Task;
  };
