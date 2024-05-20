import { useRef } from 'react';
import Layout from '@/components/layout/commonLayout';
import { useTranslation } from 'react-i18next';
import styles from '@/styles/useCase.module.less';
import pageClasses from '@/styles/responsive.module.less';
import UseCaseCard from '@/parts/useCase/useCaseCard';
import clsx from 'clsx';
import { Typography } from '@mui/material';
import { Masonry } from 'gestalt';
import 'gestalt/dist/gestalt.css';
import { RightArrow } from '@/components/icons';
import { SHARE_YOUR_STORY_URL } from '@/consts/externalLinks';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { fetchUseCases } from '@/http/useCase';
import { FinalUserCaseType } from '@/types/useCase';

export default function UseCasesTemplate(props: {
  useCaseList: FinalUserCaseType[];
}) {
  const { useCaseList } = props;
  const { t } = useTranslation('useCase');

  const scrollContainer = useRef(null);

  return (
    <Layout>
      <Head>
        <title>Use cases | Milvus</title>
        <meta
          name="description"
          content="Discover Milvus use cases across various industries to unveil the power of purpose-built vector databases. "
        />
        <meta name="keywords" content="Milvus, vector search, use cases" />
      </Head>
      <main>
        <div className={styles.casePageContainer} ref={scrollContainer}>
          <div className={clsx(pageClasses.container, styles.contentContainer)}>
            <section className={styles.headerSection}>
              <Typography variant="h2" component="h1">
                {t('title')}
              </Typography>
              <Typography variant="h5" component="p" className={styles.desc}>
                {t('desc')}
              </Typography>
            </section>
            <div className={styles.listSection}>
              {useCaseList.length ? (
                <Masonry
                  items={useCaseList}
                  columnWidth={280}
                  renderItem={({ data }) => <UseCaseCard useCase={data} />}
                  gutterWidth={30}
                  scrollContainer={scrollContainer.current}
                  virtualize
                  minCols={1}
                />
              ) : null}
            </div>
          </div>

          <section className={styles.shareSection}>
            <div className={styles.contentWrapper}>
              <h2>{t('shareSection.title')}</h2>
              <p className={styles.desc}>{t('shareSection.desc')}</p>
              <a
                href={SHARE_YOUR_STORY_URL}
                className={styles.linkBtn}
                target="_blank"
                rel="noreferrer"
              >
                {t('shareSection.cta')}
                <RightArrow />
              </a>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const useCaseList = await fetchUseCases();
  return {
    props: {
      useCaseList,
    },
  };
};
