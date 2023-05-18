
interface iWinContent {
    win: boolean;
    lose: boolean;
    number: number;
}
const WinContentModal = ({win,number}: iWinContent) => {
    return (
        <>
           {
            (win && number == 1) && 
            <p>3 stars</p>
           }
        </>
    )
}

export default WinContentModal