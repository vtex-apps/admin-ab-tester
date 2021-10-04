import React, { useState, createContext, useEffect, useContext } from 'react'
// import { useRuntime } from 'vtex.render-runtime'
import { useQuery, useMutation } from 'react-apollo'
import { useIntl } from 'react-intl'

import getTestsGQL from './../graphql/getTests.gql'
import createTestMutation from './../graphql/createTest.gql'
import finishTestMutation from './../graphql/finishTest.gql'

export const ABTestContext = createContext({} as ABTestContextInterface)

export const useABTestContext = () => useContext(ABTestContext)

export function ABTestProvider({ children }: ContextChildren) {
  // const runtime = useRuntime()
  const intl = useIntl()

  const [tests, setTests] = useState<ABTest[]>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const getTestsQuery = useQuery(getTestsGQL)

  const [createTest,
    {
      loading: loadingCreate,
      error: errorCreate,
      data: dataCreate,
    }] = useMutation(createTestMutation)

  const [finishTestGQL,
    {
      loading: loadingFinish,
      error: errorFinish,
      data: dataFinish,
    }] = useMutation(finishTestMutation)


  const [modalOpen, setModalOpen] = useState({
    isOpen: false,
    type: "CREATE"
  })

  const handleNewModal = (isOpen: boolean, type: string) => {
    setModalOpen({
      isOpen: isOpen,
      type: type
    })
  }

  const clearGeneralState = () => {
    setError("")
    setSuccess("")
    setLoading(false)
  }

  async function getTests() {
    const dataFromQuery = await getTestsQuery.refetch()
    const response = dataFromQuery.data.getTests.data
    //TODO: format date
    setTests(response)
  }

  useEffect(() => {
    getTestsQuery.loading && setLoading(true)
    if (getTestsQuery.error) {
      setLoading(false)
    }
    if (getTestsQuery.data) {
      setTests(getTestsQuery?.data.getTests?.data)
      setLoading(false)
    }
  }, [getTestsQuery.loading, getTestsQuery.error, getTestsQuery.data])

  const createNewTest = (newTest: NewTest) => {
    createTest({ variables: { workspace: newTest.name, proportion: Number(newTest.proportion), hours: Number(newTest.hours), type: newTest.type } })
  }

  const finishTest = (workspace: string) => {
    finishTestGQL({ variables: { workspace: workspace } })
  }

  useEffect(() => {
    loadingCreate && setLoading(true)
    errorCreate && setError(errorCreate.graphQLErrors[0].extensions?.exception?.response?.data)
    if (dataCreate) {
      setLoading(false);
      getTests()
      setSuccess(intl.formatMessage({ id: 'admin/admin.app.abtest.form.createTest.success' }))
      handleNewModal(false, "CREATE")
    }
  }, [loadingCreate, errorCreate, dataCreate])

  useEffect(() => {
    loadingFinish && setLoading(true)
    errorFinish && setError(errorFinish.graphQLErrors[0].extensions?.exception?.response?.data)
    if (dataFinish) {
      setLoading(false);
      getTests()
      console.log("dataFinish", dataFinish)
      setSuccess(intl.formatMessage({ id: 'admin/admin.app.abtest.form.finishTest.success' }))
    }
  }, [loadingFinish, errorFinish, dataFinish])

  return (
    <ABTestContext.Provider
      value={{
        tests,
        handleNewModal,
        modalOpen,
        createNewTest,
        finishTest,
        error,
        loading,
        success,
        setError,
        clearGeneralState
      }}
    >
      {children}
    </ABTestContext.Provider>
  )
}
