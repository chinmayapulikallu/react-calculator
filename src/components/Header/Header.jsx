import React, { Component } from "react";
//material -ui styling
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
    root: {
        marginTop: "60px",
        width: "100%",
        height: "70px",
        top: "0px",
    },
});

class Header extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Typography variant="h3">React-Calculator</Typography>
            </div>
        )
    }
}

export default (
    withStyles(styles, { withTheme: true })(Header)
);