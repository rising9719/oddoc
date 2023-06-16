use std::fs::File;

use candid::candid_method;
use ic_cdk_macros::update;

use crate::{USER_FILES};
use crate::files::FileNode;
use crate::user::{RegisterUser, User};

#[update]
#[candid_method(update)]
fn create_new_file(name: String, parent: Option<u64>) -> FileNode {
    // let principal_id = ic_cdk::api::caller();
    // Check if the user principal is already in the file store
    // let user_exists = USER_FILES.with(|files_store| {
    //     files_store.borrow().contains_key(&principal_id)
    // });
    FileNode::new(name, parent)
}


#[update]
#[candid_method(update)]
fn delete_file(id: u64) -> Option<FileNode> {
    FileNode::delete_file(id)
}


#[update]
#[candid_method(update)]
fn rename_file(id: u64, name: String) -> bool {
    FileNode::rename_file(id, name)
}
