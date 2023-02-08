import React from "react";
function FormBox ({legend,optionList,style="optionList"}) {
    return(
    <form key={legend} className={"form-box"}>
        <fieldset>
            <legend >{legend}</legend>
            <div className={style}>
                {optionList}
            </div>
        </fieldset>
    </form>)
}
export default FormBox