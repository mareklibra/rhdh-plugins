/*
 * Copyright The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  EXTENSIONS_API_VERSION,
  MarketplacePlugin,
  MarketplaceKind,
} from '@red-hat-developer-hub/backstage-plugin-marketplace-common';

export const mockPlugins: MarketplacePlugin[] = [
  {
    apiVersion: EXTENSIONS_API_VERSION,
    kind: MarketplaceKind.Plugin,
    metadata: {
      namespace: 'default',
      name: 'plugin-1',
    },
  },
  {
    apiVersion: EXTENSIONS_API_VERSION,
    kind: MarketplaceKind.Plugin,
    metadata: {
      namespace: 'default',
      name: 'plugin-2',
      title: 'Plugin 2',
    },
  },
];
