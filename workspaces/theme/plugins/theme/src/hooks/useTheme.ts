/*
 * Copyright 2024 The Backstage Authors
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
import React from 'react';
import { createUnifiedTheme, type UnifiedTheme } from '@backstage/theme';
import type { ThemeConfig } from '../types';
import { useThemeOptions } from './useThemeOptions';

/** Creates a memorized Backstage UnifiedTheme based on the given ThemeConfig. */
export const useTheme = (themeConfig: ThemeConfig): UnifiedTheme => {
  const unifiedThemeOptions = useThemeOptions(themeConfig);
  const theme = React.useMemo<UnifiedTheme>(
    () => createUnifiedTheme(unifiedThemeOptions),
    [unifiedThemeOptions],
  );
  return theme;
};