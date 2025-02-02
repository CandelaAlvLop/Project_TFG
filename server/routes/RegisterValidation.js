function validation (values) {
    const email_pattern = "^[\w\.\-]+@([\w\-]+\.)+[\w\-]{2,}$";
    
    if (values.email === "") {
        error.email = "Name should not be empty"
    }
    else if (!email_pattern.test(values.email)){
        error.email = "Incorrect Email pattern"
    } else {
        error.email = ""
    }
}