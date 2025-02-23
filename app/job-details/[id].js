import React, { useCallback, useState } from 'react';
import { 
    Text,
    View,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
    RefreshControl 
} from 'react-native';
import { Stack, useRouter, useSearchParams } from 'expo-router';
import { 
  Company,
  JobAbout, 
  JobFooter, 
  JobTabs, 
  ScreenHeaderBtn, 
  Specifics 
} from '../../components';
import { COLORS, icons, SIZES } from '../../constants';
import useFetch from '../../hook/useFetch';


const tabs = ["About", "Qualification", "Responsibilities"];

const JobDetails = () => {

  const params = useSearchParams();
  const router = useRouter();
  const { data, isLoading, error, refetch } = useFetch('job-details',{
    job_id: params.id
  })
  const [activeTab, setActiveTab ] = useState(tabs[0])
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    refetch()
    setRefreshing(false)
  }, [])

  const displayTabContent = () => {
    switch (activeTab) {
      case "Qualification":
        return <Specifics 
                title="Qualification"
                points={data[0].job_highlights?.Qualifications ?? 'N/A'}
              />
      case "About":
        return <JobAbout 
          info={data[0].job_description ?? 'No Data Provided'}
        />
      case "Responsibilities":
        return <Specifics 
                title="Responsibilities"
                points={data[0].job_highlights?.Responsibilities ?? 'N/A'}
              />
      default:
        break;
    }
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: COLORS.lightWhite },
            headerShadowVisible: false,
            headerBackVisible: false,
            headerLeft: () => (
              <ScreenHeaderBtn 
                iconUrl={icons.left}
                dimention="60%"
                handlePress={ () => router.back()}
              />
            ),
            headerRight: () => (
              <ScreenHeaderBtn 
                iconUrl={icons.share}
                dimention="60%"
              />
            ),
            headerTitle: ""
          }}
        />
        <>
          <ScrollView 
            showsVerticalScrollIndicator={false} 
            refreshControl={<RefreshControl 
                refreshing={refreshing}
                onRefresh={onRefresh}
              />}>
                {isLoading ? (
                  <ActivityIndicator size="large" color={COLORS.primary} />
                ) : error ? (
                  <Text>Something went wrong</Text>
                ) : data.length === 0 ? (
                  <Text>No data</Text>
                ) : (
                  <View style={{ padding: SIZES.medium, paddingBottom: 100 }} >
                      <Company 
                        companyLogo = {data[0].employer_logo}
                        jobTitle = {data[0].job_title}
                        companyName = {data[0].employer_name}
                        location = {data[0].job_country}
                      />

                      <JobTabs 
                        tabs={tabs}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                      />

                      {displayTabContent()}

                  </View>
                )}
          </ScrollView>
          <JobFooter url={data[0]?.job_google_link ?? 'https://carrers.google.com/jobs/'} />
        </>
    </SafeAreaView>
  )
}

export default JobDetails