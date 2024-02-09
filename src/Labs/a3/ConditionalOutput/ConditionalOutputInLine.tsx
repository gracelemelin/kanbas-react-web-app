const ConditionalOutputInLine = () => {
    const loggedIn = false;
    return (
        <>
        {loggedIn && <h2>Welcome Inline</h2>}
        {!loggedIn && <h2>Please log in Inline</h2>}
        </>
    );
}
export default ConditionalOutputInLine;