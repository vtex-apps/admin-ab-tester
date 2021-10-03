import React, { FC, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { Layout, PageBlock, PageHeader } from 'vtex.styleguide'
import ABTable from './Table/Table'
import { useABTestContext } from '../context';

const Main: FC = () => {
  return (
    <Layout
      pageHeader={
        <PageHeader
          title={<FormattedMessage id="admin/admin.app.abtest.title" />}
        />
      }
    >
      <PageBlock variation="full">
        <ABTable />
      </PageBlock>
    </Layout>
  )
}

export default Main
