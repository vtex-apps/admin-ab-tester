import React, { useState, createContext, useEffect, useContext } from 'react'
import { useMutation, useLazyQuery } from 'react-apollo'
import { useIntl } from 'react-intl'

import getTestsGQL from './../graphql/getTests.gql'
import createTestMutation from './../graphql/createTest.gql'
import finishTestMutation from './../graphql/finishTest.gql'
import saveDataGQL from './../graphql/saveData.gql'
import { formatData } from "./../utils"

export const ABTestContext = createContext({} as ABTestContextInterface)

export const useABTestContext = () => useContext(ABTestContext)

export function ABTestProvider({ children }: ContextChildren) {
  const intl = useIntl()
  const [saveData] = useMutation(saveDataGQL)
  const [getTestsQuery, { data: dataGetTests, loading: loadingGetTests, refetch: refetchGetTests }] = useLazyQuery(getTestsGQL)

  const [tests, setTests] = useState<ABTest[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [emptyMessage, setEmptyMessage] = useState("")

  const [testToCreate, setTestToCreate] = useState<NewTest>({
    name: "",
    proportion: 0,
    hours: 0,
    type: ""
  })

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


  useEffect(() => {
    getTestsQuery()
  }, [])

  useEffect(() => {
    loadingGetTests && setLoading(true)
    if (dataGetTests) {
      if (dataGetTests.getTests?.status === 201) {
        setTests(formatData(dataGetTests.getTests?.data))
        setLoading(false)
      } else {
        setLoading(false)
        setTests([])
        setEmptyMessage(dataGetTests.getTests?.error)
      }
    }
  }, [dataGetTests])


  const createNewTest = (newTest: NewTest) => {
    createTest({ variables: { workspace: newTest.name, proportion: Number(newTest.proportion), hours: Number(newTest.hours), type: newTest.type } })
    setTestToCreate(newTest)
  }

  const finishTest = (workspace: string) => {
    finishTestGQL({ variables: { workspace: workspace } })
  }

  useEffect(() => {
    loadingCreate && setLoading(true)
    if (errorCreate) {
      setError(errorCreate.graphQLErrors[0].extensions?.exception?.response?.data)
    }
    if (dataCreate) {
      setLoading(false);
      refetchGetTests()
      setSuccess(intl.formatMessage({ id: 'admin/admin.app.abtest.form.createTest.success' }))
      handleNewModal(false, "CREATE")
      //if the test is successfully created we save the data in vbase to show it in the table
      saveData({ variables: { key: testToCreate.name, value: `"{'proportion':${testToCreate.proportion},'hours':${testToCreate.hours},'type': '${testToCreate.type}'}"` } })
    }
  }, [loadingCreate, errorCreate, dataCreate])

  useEffect(() => {
    loadingFinish && setLoading(true)
    if (errorFinish) {
      setError(errorFinish.graphQLErrors[0].extensions?.exception?.response?.data)
    }
    if (dataFinish) {
      setLoading(false);
      refetchGetTests()
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
        clearGeneralState,
        emptyMessage
      }}
    >
      {children}
    </ABTestContext.Provider>
  )
}
