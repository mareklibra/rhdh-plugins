/*
 * Copyright Red Hat, Inc.
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

// TODO: Rewrite

import React, { useCallback, useMemo } from 'react';
import {
  FormDecoratorProps,
  OrchestratorFormApi,
  useWrapperFormPropsContext,
} from '@red-hat-developer-hub/backstage-plugin-orchestrator-form-api';
import {
  ErrorSchema,
  FormValidation,
  RegistryWidgetsType,
  UiSchema,
  Widget,
} from '@rjsf/utils';
import { JsonObject } from '@backstage/types';
import { JSONSchema7 } from 'json-schema';
// import CountryWidget from './widgets/CountryWidget';
// import LanguageWidget from './widgets/LanguageSelectWidget';
import { FormContextData } from './types';
import { ConfigApi, FetchApi } from '@backstage/core-plugin-api';
import { SchemaUpdater, ActiveTextInput } from './widgets';

// const reservedNames = ['admin', 'root', 'system'];

// const sleep = (ms: number) => {
//   return new Promise(resolve => setTimeout(resolve, ms));
// };

const customValidate = (
  _formData: JsonObject | undefined,
  errors: FormValidation<JsonObject>,
): FormValidation<JsonObject> => {
  // const _formData = formData as Data | undefined;

  // if (
  //   _formData?.personalInfo?.password !==
  //   _formData?.personalInfo?.confirmPassword
  // ) {
  //   errors.personalInfo?.password?.addError('passwords do not match');
  // }

  // if ((_formData?.personalInfo?.password?.length || 0) < 10) {
  //   errors.personalInfo?.password?.addError(
  //     'password length minimal length is 10',
  //   );
  // }

  return errors;
};

export class FormWidgetsApi implements OrchestratorFormApi {
  // private readonly configApi: ConfigApi;
  // private readonly fetchApi: FetchApi;

  // public constructor(options: { configApi: ConfigApi; fetchApi: FetchApi }) {
  // this.configApi = options.configApi;
  // this.fetchApi = options.fetchApi;
  // }

  getFormDecorator: OrchestratorFormApi['getFormDecorator'] = () =>
    // _schema,
    // updateSchema,
    // _uiSchema,
    // initialFormData,
    {
      return (FormComponent: React.ComponentType<FormDecoratorProps>) => {
        return () => {
          const { formData, setFormData } = useWrapperFormPropsContext();

          // const widgets = useMemo<RegistryWidgetsType<JsonObject, JSONSchema7, any>>(() => {
          //   const SchemaUpdaterWrapper: Widget<
          //     JsonObject,
          //     JSONSchema7,
          //     FormContextData
          //   > = props => <SchemaUpdater {...props} updateSchema={formContext.updateSchema} />;

          //   return {
          //     SchemaUpdater: SchemaUpdaterWrapper,
          //   }
          // }, [formContext.updateSchema]);

          const widgets = { SchemaUpdater, ActiveTextInput };

          const onChange = useCallback(
            (data: JsonObject | undefined) => {
              if (data) {
                setFormData(data);
              }
            },
            [setFormData],
          );

          return (
            <FormComponent
              widgets={widgets}
              onChange={e => {
                onChange(e.formData);
              }}
              formContext={formData}
              customValidate={customValidate}
              // getExtraErrors={
              //     async (formData: JsonObject) => {
              //         const _formData = formData as Data;

              //         return sleep(1000).then(() => {
              //             const errors: ErrorSchema<Data> = {};

              //             if (reservedNames.includes(_formData.personalInfo?.firstName)) {
              //                 errors.personalInfo = {
              //                     // @ts-ignore
              //                     firstName: {
              //                         __errors: [
              //                             `Name ${_formData.personalInfo?.firstName} is reserved`,
              //                         ],
              //                     },
              //                 };
              //             }
              //             return errors;
              //         });
              //     }
              // }
            />
          );
        };
      };
    };
}
