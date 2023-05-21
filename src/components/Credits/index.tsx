import { Card, Link, Text } from "@chakra-ui/react"

const Credits =()=>{
    return (
        <>
            <Card bg='transparent' shadow={'none'}>
                <Text bg={"transparent"} color={'rgb(60 59 59);'}>Made by <Link textDecorationLine={'underline'} href="https://github.com/leltk">leltk</Link></Text>
            </Card>
        </>
    )
}

export default Credits