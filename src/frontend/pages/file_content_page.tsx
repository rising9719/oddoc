import {useDispatch, useSelector} from "react-redux";
import * as React from "react";
import {useCallback} from "react";
import {handleRedux} from "../redux/main";
import {payment_contract_sample, shares_contract_sample} from "../data_processing/data_samples";
import {FileNode} from "../../declarations/user_canister/user_canister.did";
import EditorComponent from "../components/editor_components/main";
import {Typography} from "@mui/material";
import debounce from "../utils/debounce";




function FileContentPage(props: any) {

    const {current_file, files_content, profile} = useSelector((state: any) => state.filesReducer);


    const dispatch = useDispatch();


    function onChange(changes: any) {
        if (files_content[current_file.id] !== changes) {
            dispatch(handleRedux("UPDATE_CONTENT", {id: current_file.id, content: changes}));
            dispatch(handleRedux("CONTENT_CHANGES", {id: current_file.id, changes: changes}));
        }
    }

    const editorKey = current_file.name || ""; // Provide a key based on current_file.name

    const handleInputChange = useCallback(
        debounce((title: string) => {
            if (title !== current_file.name) {
                let file: FileNode = {
                    ...current_file,
                    name: title,
                    parent: current_file.parent,
                    children: current_file.children,
                    share_id: current_file.share_id || []
                };
                dispatch(handleRedux("UPDATE_FILE_TITLE", {id: current_file.id, title: title}));
                dispatch(handleRedux("FILE_CHANGES", {changes: file}));
            }
        }, 250),
        []
    );


    let handleTitleKeyDown = (e: any) => {
        let title = e.target.innerText;
        handleInputChange(title);
    };
    let preventEnter = (e: any) => {
        if (e.key === "Enter") {
            e.preventDefault();
            e.target.blur();
        }

    };


    function handleOnInsertComponent(e: any, component: any) {
        switch (component.type) {
            case "payment_contract":
                dispatch(handleRedux("ADD_CONTRACT", {contract: payment_contract_sample}))
                dispatch(handleRedux("CONTRACT_CHANGES", {changes: payment_contract_sample}));
            case "shares_contract":
                let new_contract = {...shares_contract_sample, author: profile.id};
                dispatch(handleRedux("ADD_CONTRACT", {contract: new_contract}))
                dispatch(handleRedux("CONTRACT_CHANGES", {changes: new_contract}));
            case "data_grid":
                return null;
            default:
                return null;
            // case "data_grid":
            //     dispatch(handleRedux("CONTRACT_CHANGES", {changes: contract_sample}));

        }

    }


    if (current_file.id != null) {
        let content = files_content[current_file.id];
        let title = `${current_file.name || "Untitled"}`;

        return (
            <div style={{marginTop: "3px", marginLeft: "10%", marginRight: "10%"}}>

                <Typography
                    variant="h3"
                    onKeyDown={preventEnter}
                    onKeyUp={handleTitleKeyDown}
                    contentEditable={true}>{title}</Typography>
                <EditorComponent
                    handleOnInsertComponent={handleOnInsertComponent}
                    onChange={onChange}
                    editorKey={editorKey}
                    content={content || []}
                />
            </div>
        );
    }
    return (
        <span>
      404
      dummy
    </span>
    );
}

export default FileContentPage;
