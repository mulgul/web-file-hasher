use wasm_bindgen::prelude::*;

use base64ct::{Base64, Encoding};
use blake2::{Blake2b512, Blake2s256};
use md5::Md5;
use ripemd::{Ripemd160, Ripemd320};
use sha2::{Digest, Sha256, Sha384, Sha512};
use sha3::{Sha3_256, Sha3_512};

#[wasm_bindgen]
pub fn hasher(hash_type: &str, data: &str) -> Result<String, String> {
    return match hash_type {
        "blake2s256" => Ok(blake2s256(data)),
        "blake2b512" => Ok(blake2b512(data)),
        "ripemd160" => Ok(ripemd160(data)),
        "ripemd320" => Ok(ripemd320(data)),
        "sha256" => Ok(sha256(data)),
        "sha512" => Ok(sha512(data)),
        "sha384" => Ok(sha384(data)),
        "sha3_256" => Ok(sha3_256(data)),
        "sha3_512" => Ok(sha3_512(data)),
        "md5" => Ok(md5(data)),
        _ => Err("Hash Type Not Found".to_string()),
    };
}

fn blake2s256(data: &str) -> String {
    let mut hasher = Blake2s256::new();
    hasher.update(data);
    let hash = hasher.finalize();
    let base64_hash = Base64::encode_string(&hash);

    base64_hash
}

fn blake2b512(data: &str) -> String {
    let mut hasher = Blake2b512::new();
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

fn ripemd160(data: &str) -> String {
    let mut hasher = Ripemd160::new();
    hasher.update(data);
    let hash = hasher.finalize();
    let base64_hash = Base64::encode_string(&hash);

    base64_hash
}

fn ripemd320(data: &str) -> String {
    let mut hasher = Ripemd320::new();
    hasher.update(data);
    let hash = hasher.finalize();
    let base64_hash = Base64::encode_string(&hash);

    base64_hash
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

    #[test]
    fn test_blake2s256() {
        let result = blake2s256("test");
        assert_eq!("8wj8As6Rcq0Cp9dYAOz8AnEJvGeYfqMqupuNzHsQFQ4=", result);
    }

    #[test]
    fn test_blake2b512() {
        let result = blake2b512("test");
        assert_eq!("pxB51ChT3qJuRTAEM4ZwpTgUt4E3/77QdgOkHXakg6qbwztYL3fTCmXm8pqJbAQR84MS4dZuC/Fjhshqib6lcg==", result);
    }

    #[test]
    fn test_ripemd160() {
        let result = ripemd160("test");
        assert_eq!("XlL+5H5rBwVl90NyRozcaZ3okQc=", result);
    }

    #[test]
    fn test_ripemd320() {
        let result = ripemd320("test");
        assert_eq!(
            "OwouhB5YnPWDY0pd0mXStdSXxMxEskHjTg9i0D6YwbnccpcLm8IOtQ==",
            result
        );
    }
}
