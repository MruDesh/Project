
import React from "react";
import { Formik, Form, Field } from "formik";
import ReactDOM from "react-dom";
import MUIDataTable from "mui-datatables";
import { MuiThemeProvider } from "@material-ui/core/styles";
import infoIcon from "../assets/images/basic-info-blue.png";


class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            disabled: false
        };
        this.initialState = this.state;

    }

    componentDidMount() {
        fetch('https://bakesaleforgood.com/api/deals')
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    dealList: data,
                })
            })
            .catch(console.log)
    }

    _hideForm = (e) => {
        this.setState(this.initialState);
    };

    render() {

        const columns = [
            {
                name: "title",
                label: "Title",
                field: "title",

            },
            {
                name: "price",
                label: "Price",
                field: "price",
            },
            {
                name: "viewDetails",
                label: "View Details",
                field: "viewDetails",
                options: {
                    filter: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return (
                            <div>
                                <button onClick={() => {
                                    var id = tableMeta.rowIndex
                                    var KeyID = this.state.dealList[id].key

                                    this.setState(
                                        {
                                            key: KeyID,
                                            price: this.state.dealList[id].price,
                                            title: this.state.dealList[id].title,
                                            cause: this.state.dealList[id].cause.name,
                                            showForm: !this.state.showForm,
                                        },
                                    );
                                }
                                }>
                                    <img src={infoIcon} />
                                </button>
                            </div>
                        )
                    }
                }
            }
        ];
        const options = {
            jsonMode: true,
            filter: true,
            filterType: "dropdown",
            // responsive,
            rowsPerPage: 10,
            pagination: {
                next: "Next",
                previous: "Previous",
                rowsPerPage: "Rows per page:",
                displayRows: "of",
            },
            selectableRows: "none"
        };

        return (
            <React.Fragment>
                {this.state.showForm ? (
                    <div>
                        <div className="all-title"><b>Deal Details</b></div>
                        &nbsp;
                        <Formik
                            enableReinitialize
                            initialValues={{
                                title: this.state.title,
                                price: this.state.price,
                                cause: this.state.cause
                            }}
                        >
                            {({ touched, errors, setFieldValue, values }) => (
                                <Form>
                                    <div className="form-group mb">
                                        <label htmlFor="">
                                            <b> Title : </b>
                                        </label>
                                            <Field
                                                type="text"
                                                id="title"
                                                name="title"
                                                placeholder="Title"
                                            />
                                    </div>
                                    &nbsp;
                                    <div className="form-group mb">
                                            <label htmlFor="">
                                                <b>Price : </b>
                                            </label>
                                            <Field
                                                type="text"
                                                id="price"
                                                name="price"
                                                placeholder="Price"
                                            />
                                        </div>
                                    &nbsp;
                                    <div className="form-group mb">
                                            <label htmlFor="">
                                                <b>Cause : </b>
                                            </label>
                                            <Field
                                                type="text"
                                                id="cause"
                                                name="cause"
                                                placeholder="cause"
                                            />
                                        </div>
                                    &nbsp;
                                    <button className="btn btn-primary blue-btn pull-right" type="submit"
                                            onClick={this._hideForm}
                                        >Cancel</button>
                                        <div className="clearfix" ></div >
                                </Form>
                            )}
                        </Formik>
                    </div>
                ) : null}
                        <div className="table-top-box">
                            <div className="clearfix"></div>

                        </div>

                        <MuiThemeProvider >
                            <MUIDataTable
                                title={"Deal List"}
                                data={this.state.dealList}
                                columns={columns}
                                options={options}
                            />
                        </MuiThemeProvider>

                        <div className="set-space-20"></div>
            </React.Fragment>
                );
    }
}

export default LandingPage;