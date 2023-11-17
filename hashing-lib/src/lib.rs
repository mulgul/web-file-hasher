use wasm_bindgen::prelude::*;

use base64ct::{Base64, Encoding};
use md5::Md5;
use sha2::{Digest, Sha256, Sha384, Sha512};
use sha3::{Sha3_256, Sha3_512};

#[wasm_bindgen]
pub fn hasher(hash_type: &str, data: &str) -> Result<String, String> {
    return match hash_type {
        "sha256" => Ok(sha256(data)),
        "sha512" => Ok(sha512(data)),
        "sha384" => Ok(sha384(data)),
        "sha3_256" => Ok(sha3_256(data)),
        "sha3_512" => Ok(sha3_512(data)),
        "md5" => Ok(md5(data)),
        _ => Err("Hash Type Not Found".to_string()),
    };
}

fn sha256(data: &str) -> String {
    let mut hasher = Sha256::new();
    hasher.update(data);
    let hash = hasher.finalize();
    let base64_hash = Base64::encode_string(&hash);

    base64_hash
}

fn sha384(data: &str) -> String {
    let mut hasher = Sha384::new();
    hasher.update(data);
    let hash = hasher.finalize();
    let base64_hash = Base64::encode_string(&hash);

    base64_hash
}

fn sha512(data: &str) -> String {
    let mut hasher = Sha512::new();
    hasher.update(data);
    let hash = hasher.finalize();
    let base64_hash = Base64::encode_string(&hash);

    base64_hash
}

fn sha3_256(data: &str) -> String {
    let mut hasher = Sha3_256::new();
    hasher.update(data);
    let hash = hasher.finalize();
    let base64_hash = Base64::encode_string(&hash);

    base64_hash
}

fn sha3_512(data: &str) -> String {
    let mut hasher = Sha3_512::new();
    hasher.update(data);
    let hash = hasher.finalize();
    let base64_hash = Base64::encode_string(&hash);

    base64_hash
}

fn md5(data: &str) -> String {
    let mut hasher = Md5::new();
    hasher.update(data);
    let hash = hasher.finalize();
    let base64_hash = Base64::encode_string(&hash);

    base64_hash
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn test_sha256() {
        let result = sha256("test");
        assert_eq!("n4bQgYhMfWWaL+qgxVrQFaO/TxsrC4Is0V1sFbDwCgg=", result);
    }

    #[test]
    fn test_md5() {
        let result = md5("test");
        assert_eq!("CY9rzUYh03PK3k6DJie09g==", result);
    }

    #[test]
    fn test_sha512() {
        let result = sha512("test");
        assert_eq!("7iaw3Ur350mqGo7jwQrpkj9hiYB3Lkc/iBml1JQODbJ6wYX4oOHV+E+IvIh/1nsUNzLDBMxfqa2Ob1f1ACio/w==", result);
    }

    #[test]
    fn test_sha384() {
        let result = sha384("test");
        assert_eq!(
            "doQSMg97CqWBL85CjcRwazyuUOAqZMqhangiSb/o78S37xzLEmJV0ZYEff7fF6Cp",
            result
        );
    }

    #[test]
    fn test_sha3_256() {
        let result = sha3_256("test");
        assert_eq!("NvAoWAuwLMgnKpoCD0IA40bidq5mTkXugHRVdOL1q4A=", result);
    }

    #[test]
    fn test_sha3_512() {
        let result = sha3_512("test");
        assert_eq!("ns4IbpusSR+sXB0QRsoR1ze5KisuvZPwBde3EBEMCmeCiBZuf755aIOk8umzyp9IT1IdDORkNFzBrslneRScFA==", result);
    }
}
