import React from "react";

const MemoComponent = ({name = "Demo Memo"}) => {

    console.log('Memoooo', name)
    return (
        <>
            <div>
                {
                    name
                }
            </div>
        </>
    )
}

export default React.memo(MemoComponent);