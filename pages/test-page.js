import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'

import authorsResource from '../resources/authors'

const TestPage = (props) => {
  return (
    <>
      <div className="test-page-container">
        <Head>
          <title>test-page - Direct Intranet Planner</title>
          <meta
            property="og:title"
            content="test-page - Direct Intranet Planner"
          />
        </Head>
        <DataProvider
          renderSuccess={(context_tpeuv9) => (
            <>
              <h1 id={context_tpeuv9?.Name}>Heading</h1>
            </>
          )}
          initialData={props.contextTpeuv9Prop}
          persistDataDuringLoading={true}
          key={props?.contextTpeuv9Prop?.id}
        />
      </div>
      <style jsx>
        {`
          .test-page-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
        `}
      </style>
    </>
  )
}

export default TestPage

export async function getStaticProps(context) {
  try {
    const contextTpeuv9Prop = await authorsResource({
      ...context?.params,
    })
    return {
      props: {
        contextTpeuv9Prop: contextTpeuv9Prop?.data?.[0],
      },
      revalidate: 60,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
