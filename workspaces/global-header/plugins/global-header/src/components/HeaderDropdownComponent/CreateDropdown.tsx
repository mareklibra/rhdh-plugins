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

import React, { useEffect, useMemo, useState } from 'react';
import { catalogApiRef } from '@backstage/plugin-catalog-react';
import HeaderDropdownComponent from './HeaderDropdownComponent';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import { MenuItemConfig } from './MenuSection';
import { useApi } from '@backstage/core-plugin-api';
import { Entity } from '@backstage/catalog-model';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ComponentType, HeaderDropdownComponentProps } from '../../types';
import { HeaderLink } from '../HeaderLinkComponent/HeaderLink';
import { useCreateDropdownMountPoints } from '../../hooks/useCreateDropdownMountPoints';

/**
 * @public
 * Props for each dropdown section component
 */
interface SectionComponentProps {
  handleClose: () => void;
  hideDivider: boolean;
  items?: MenuItemConfig[];
}

export const CreateDropdown = ({
  handleMenu,
  anchorEl,
  setAnchorEl,
}: HeaderDropdownComponentProps) => {
  const catalogApi = useApi(catalogApiRef);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const createDropdownMountPoints = useCreateDropdownMountPoints();

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const response = await catalogApi.getEntities({
          filter: { kind: ['Template'] },
          limit: 7,
        });
        setEntities(response.items);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEntities();
  }, [catalogApi]);

  const items = useMemo(() => {
    return entities
      .filter(e => e.kind === 'Template')
      .map(m => ({
        Component: HeaderLink as React.ComponentType,
        type: ComponentType.LINK,
        label: m.metadata.title ?? m.metadata.name,
        link: `/create/templates/default/${m.metadata.name}`,
      }));
  }, [entities]);

  const menuSections = useMemo(() => {
    return (createDropdownMountPoints ?? [])
      .map(mp => ({
        Component: mp.Component as React.ComponentType<SectionComponentProps>,
        type: mp.config?.type ?? ComponentType.LINK,
        priority: mp.config?.priority ?? 0,
      }))
      .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
  }, [createDropdownMountPoints]);

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" p={2}>
        <Typography variant="body1" color="error">
          Error fetching templates
        </Typography>
      </Box>
    );
  }

  if (menuSections.length === 0) {
    return null;
  }

  return (
    <HeaderDropdownComponent
      buttonContent={
        <>
          Create <ArrowDropDownOutlinedIcon sx={{ ml: 1 }} />
        </>
      }
      buttonProps={{
        variant: 'outlined',
        disabled: loading,
        sx: {
          mr: 2,
          color: '#fff',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          '&:hover, &.Mui-focusVisible': {
            border: '1px solid #fff',
          },
        },
      }}
      buttonClick={handleMenu}
      anchorEl={anchorEl}
      setAnchorEl={setAnchorEl}
    >
      {menuSections.map((section, index) => (
        <section.Component
          key={`menu-section-${index.toString()}`}
          hideDivider={index === menuSections.length - 1}
          handleClose={() => setAnchorEl(null)}
          {...(section.type === ComponentType.LIST ? { items } : {})}
        />
      ))}
    </HeaderDropdownComponent>
  );
};
