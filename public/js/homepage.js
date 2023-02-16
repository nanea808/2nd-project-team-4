$(() => {
    const redirectGroup = (event) => {
        const element = event.target;
        
        if (element.matches("p")) {
            document.location = "/group";
            
        }
    }

    $('#groups-col').children().eq(1).click(redirectGroup)
});