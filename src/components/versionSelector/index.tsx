import classes from './index.module.less';
import Link from 'next/link';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import clsx from 'clsx';
import { useMemo } from 'react';
import { AllMdVersionIdType, ApiReferenceRouteEnum } from '@/types/docs';
import { generateVersionSelectOptions } from '@/utils';

interface VersionSelectorProps {
  versions: string[];
  curVersion: string;
  latestVersion: string;
  type: 'doc' | 'api';
  currentMdId: string;
  homepageConf: {
    label: string;
    link: string;
  };
  mdListData: AllMdVersionIdType[];
  category?: ApiReferenceRouteEnum;
}

export default function VersionSelector(props: VersionSelectorProps) {
  const {
    versions,
    curVersion,
    latestVersion,
    type,
    currentMdId,
    homepageConf, // currentId = 'xxx.md' || 'home'
    mdListData,
    category,
  } = props;

  const links = useMemo(() => {
    if (currentMdId === 'home') {
      // doc home page
      return versions.map(v => ({
        label: v,
        href: v === latestVersion ? '/docs' : `/docs/${v}`,
      }));
    }

    return generateVersionSelectOptions({
      versions,
      currentMdId,
      mdListData,
      latestVersion,
      type,
      category,
    });
  }, [currentMdId, mdListData, latestVersion, versions, category]);

  return (
    <div className={classes.selectorWrapper}>
      <Link
        href={homepageConf.link}
        className={clsx(classes.homeBtn, classes.docHomeButton)}
      >
        {homepageConf.label}
      </Link>

      <Select
        value={curVersion}
        onChange={data => {}}
        classes={{
          select: classes.selectRoot,
        }}
      >
        {links.map(v => (
          <MenuItem value={v.label} key={v.label}>
            <Link
              href={v.href}
              className={clsx(classes.versionLink, {
                [classes.disabledLink]: v.label === curVersion,
              })}
            >
              {v.label}
            </Link>
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
