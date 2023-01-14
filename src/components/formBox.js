import RadioSelector from "./RadioSelector";
import React from "react";
function FormBox ({legend,optionList,style="optionList"}) {
    return(
    <form>
        <fieldset>
            <legend>{legend}</legend>
            <div className={style}>
                {optionList}
            </div>
        </fieldset>
    </form>)
}
export default FormBox