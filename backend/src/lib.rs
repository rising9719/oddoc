use std::cell::RefCell;
use std::collections::{BTreeMap, HashMap};

use ic_cdk::{
    api::call::ManualReply,
    export::{
        candid::{CandidType, Deserialize},
        Principal,
    },
};
use ic_cdk::export::candid::{
    candid_method, check_prog, export_service, IDLProg, TypeEnv,
};
use ic_cdk_macros::*;

use files::*;
use files::FileNode;
use user::*;
use user::*;

use crate::user::User;

mod user;
mod media;
mod files;

type IdStore = BTreeMap<String, Principal>;
type ProfileStore = BTreeMap<Principal, User>;
type FilesStore = BTreeMap<Principal, HashMap<u64, FileNode>>;

// TODO User canister storage for dynamic user canister
// type ProfileStore = User;
// type FilesStore = BTreeMap<HashMap<u64, FileNode>>;

thread_local! {
    static PROFILE_STORE: RefCell<ProfileStore> = RefCell::default();
    static ID_STORE: RefCell<IdStore> = RefCell::default();
    static USER_FILES: RefCell<FilesStore> = RefCell::default();
}

#[cfg(test)]
mod tests {
    use std::borrow::Cow;
    use std::env;
    use std::fs::{create_dir_all, write};
    use std::path::PathBuf;

    use ic_cdk::{api, update};
    use ic_cdk::export::candid::{
        candid_method, CandidType, check_prog, Deserialize, export_service, IDLProg, TypeEnv,
    };

    use super::*;

    #[test]
    fn save_candid_2() {
        #[ic_cdk_macros::query(name = "__get_candid_interface_tmp_hack")]
        fn export_candid() -> String {
            export_service!();
            __export_service()
        }

        let dir: PathBuf = env::current_dir().unwrap();
        let canister_name: Cow<str> = dir.file_name().unwrap().to_string_lossy();

        match create_dir_all(&dir) {
            Ok(_) => println!("Successfully created directory"),
            Err(e) => println!("Failed to create directory: {}", e),
        }

        let res = write(dir.join(format!("{:?}.did", canister_name).replace("\"", "")), export_candid());
        println!("-------- Wrote to {:?}", dir);
        println!("-------- res {:?}", canister_name);
    }
}
