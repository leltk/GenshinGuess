import { Card, Link, Text } from "@chakra-ui/react"

const Credits =()=>{
    return (
        <>
            <Card bg='transparent' shadow={'none'}>
                <Text bg={"transparent"} color={'#c1c1c1'}>Made by <Link textDecorationLine={'underline'} href="https://github.com/leltk">leltk</Link></Text>
            </Card>
        </>
    )
}

export default Credits