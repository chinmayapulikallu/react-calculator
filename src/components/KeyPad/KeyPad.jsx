import React, { Component } from "react";
import { connect } from "react-redux";
//material -ui styling
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

//useStyles for material-ui styling
const useStyles = (theme) => ({
    root: {
        marginTop: 50,
        marginBottom: 40,
        textAlign: "center",
    },
    results: {
        marginTop: 50,
    },
    clear: {
        width: "275px"
    },
    inputs: {
        width: "275px",
        marginBottom: "10px"
    },
    btn: {
        margin: "3px"
    },
    clearButton: {
        marginTop: "6px"
    }
});

class KeyPad extends Component {
    poll = ''

    state = {
        input: '0',
        waitingForOperand: false,
        operator: null,
        display: [],
        values: []
    }

    getCalculations = () => {
        this.props.dispatch({
            type: "GET_CALCULATED_DATA"
        })
    }

    //dispatches get request to get the calculated data
    //when the page loads
    componentDidMount() {
        this.getCalculations();
        //starts polling and set interval for 2 seconds
        this.poll  = window.setInterval(this.getCalculations, 2000)
        window.setTimeout(this.stopPolling, 120000)
    }

    //stops polling using clear Interval
    stopPolling = () => {
        window.clearInterval(this.polling)
    }

    //When the operator is selected this function sets the states
    handleCalculation = (operator) => {
        if (this.state.input === '0') {
            alert("Enter a number")
        } else {
            this.setState({
                waitingForOperand: true,
                operator: operator,
                values: [...this.state.values, this.state.input, operator],
                display: this.state.display + ' ' + operator + ' '
            })
        }
    }

    //To clear inputs on clicking clear handleClear function gets called
    handleClear = () => {
        this.setState({
            input: '0',
            values: [],
            display: '',
        })
    }

    //Once the inputs and operator is selected on clicking equals dispatches
    //values to the sever, clears the old values and also dispatches to get the calculated values
    handleDispatch = () => {
        this.setState({
            values: [...this.state.values, this.state.input]
        }, () => {
            this.props.dispatch({ type: "SET_OPERATION", payload: this.state })
            //clear everything
            this.handleClear()
        })
    }

    //handleDot sets the dot in a number and after an operator is selected
    handleDot = () => {
        const { input, waitingForOperand } = this.state
        if (waitingForOperand) {
            this.setState({
                input: '.',
                waitingForOperand: false,
                display: this.state.display + '.'
            })
        } else if (input.indexOf('.') === -1) {
            this.setState({
                input: input + '.',
                waitingForOperand: false,
                display: this.state.display + '.'
            })
        }
    }

    //On clicking the number handleNumber function gets called and sets the state
    handleNumber = (value) => {
        const { input, waitingForOperand } = this.state
        if (waitingForOperand) {
            this.setState({
                ...this.state,
                input: String(value),
                waitingForOperand: false,
                display: this.state.display + String(value)
            })
        } else {
            this.setState({
                ...this.state,
                input: input === '0' ? String(value) : input + value,
                display: this.state.display + String(value)
            })
        }
    }

    render() {
        const { classes, calculate } = this.props;
        return(
            <Container className={classes.root} maxWidth="md">
                <div>
                    <TextField
                        className={classes.inputs}
                        color="secondary"
                        variant="outlined"
                        size="small"
                        value={this.state.display}
                    />
                </div>
                <div>
                    <Button name="7" variant="contained" className={classes.btn} color="primary" onClick={() => this.handleNumber(7)}>7</Button>
                    <Button name="8" variant="contained" className={classes.btn} color="primary" onClick={() => this.handleNumber(8)}>8</Button>
                    <Button name="9" variant="contained" className={classes.btn} color="primary" onClick={() => this.handleNumber(9)}>9</Button>
                    <Button name="/" variant="contained" className={classes.btn} color="secondary" onClick={() => this.handleCalculation('/')}>/</Button>
                </div>
                <div>
                    <Button name="4" variant="contained" className={classes.btn} color="primary" onClick={() => this.handleNumber(4)}>4</Button>
                    <Button name="5" variant="contained" className={classes.btn} color="primary" onClick={() => this.handleNumber(5)}>5</Button>
                    <Button name="6" variant="contained" className={classes.btn} color="primary" onClick={() => this.handleNumber(6)}>6</Button>
                    <Button name="*" variant="contained" className={classes.btn} color="secondary" onClick={() => this.handleCalculation('*')}>*</Button>
                </div>
                <div>
                    <Button name="1" variant="contained" className={classes.btn} color="primary" onClick={() => this.handleNumber(1)}>1</Button>
                    <Button name="2" variant="contained" className={classes.btn} color="primary" onClick={() => this.handleNumber(2)}>2</Button>
                    <Button name="3" variant="contained" className={classes.btn} color="primary" onClick={() => this.handleNumber(3)}>3</Button>
                    <Button name="+" variant="contained" className={classes.btn} color="secondary" onClick={() => this.handleCalculation('+')}>+</Button>
                </div>
                <div>
                    <Button name="." variant="contained" className={classes.btn} color="primary" onClick={() => this.handleDot()}>.</Button>
                    <Button name="0" variant="contained" className={classes.btn} color="primary" onClick={() => this.handleNumber(0)}>0</Button>
                    <Button name="=" variant="contained" className={classes.btn} color="primary" onClick={this.handleDispatch}>=</Button>
                    <Button name="-" variant="contained" className={classes.btn} color="secondary" onClick={() => this.handleCalculation('-')}>-</Button>
                </div>
                <div className={classes.clearButton}>
                    <Button variant="contained" color="secondary" className={classes.clear} onClick={this.handleClear}>Clear</Button>
                </div>
                <Card className={classes.results}>
                    <CardContent>
                        <Typography variant="h4"> Results </Typography>
                        {calculate.map((result, index) =>
                            <Typography key={index} variant="body1"> {result} </Typography>
                        )
                        }
                    </CardContent>
                </Card>
            </Container>

        )
    }
}

const putReduxStateOnProps = (reduxState) => ({
    calculate: reduxState.calculate
});

export default withStyles(useStyles)
    (connect(putReduxStateOnProps)(KeyPad)
    );
