import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import dynamic from 'next/dynamic';
import { SideBar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { api } from "../services/apiClient";
import { withSSRAuth } from "../utils/withSSRAuth";
import { setupAPIClient } from "../services/api";
import { useCan } from "../hooks/useCan";

const Chart = dynamic(() => import('react-apexcharts'), {
    // SSR is disabled.
    ssr: false
})

export default function Dashboard() {
    const { user } = useContext(AuthContext)

    const userCanSeeMetrics = useCan({
        permissions: ['metrics.list']
    })

    useEffect(() => {
        api.get('/me', {
            baseURL: 'http://localhost:3333'
        })
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }, [])

    const options = {
        chart: {
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            },
            foreColor: theme.colors.gray[500]
        },
        grid: {
            show: false
        },
        dataLabels: {
            enabled: false
        },
        tooltip: {
            enabled: false
        },
        xaxis: {
            type: "datetime",
            axisBorder: {
                color: theme.colors.gray[600]
            },
            axisTicks: {
                color: theme.colors.gray[600]
            },
            categories: [
                '2021-03-18T00:00:00.000Z',
                '2021-03-19T00:00:00.000Z',
                '2021-03-20T00:00:00.000Z',
                '2021-03-21T00:00:00.000Z',
                '2021-03-22T00:00:00.000Z',
                '2021-03-23T00:00:00.000Z',
                '2021-03-24T00:00:00.000Z'
            ]
        },
        fill: {
            opacity: 0.3,
            type: 'gradient',
            gradient: {
                shade: 'dark',
                opacityFrom: 0.7,
                opacityTo: 0.3
            }
        }
    };

    const series = [
        {
            name: 'serie1', data: [31, 120, 10, 28, 61, 18, 109]
        }
    ]

    return (
        <Flex direction="column" h="100vh">
            <Header />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <SideBar />

                {userCanSeeMetrics &&
                    <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
                        <Box
                            p={["6", "8"]}
                            bg="gray.800"
                            borderRadius={8}
                            pb="4"
                        >
                            <Text fontSize="lg" mb="4">Subscribers of the week</Text>
                            <Chart options={options} series={series} type="area" height={160} />
                        </Box>
                        <Box
                            p={["6", "8"]}
                            bg="gray.800"
                            borderRadius={8}
                            pb="4"
                        >
                            <Text fontSize="lg" mb="4">Opening rate</Text>
                            <Chart options={options} series={series} type="area" height={160} />
                        </Box>
                    </SimpleGrid>
                }
            </Flex>


        </Flex>
    )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx)

    const response = await apiClient.get('/me', {
        baseURL: 'http://localhost:3333'
    })
    return {
        props: {}
    }
})