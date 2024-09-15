import hashlib
import time

api_key = "6ad29c83300851c6beb751e3c6cd2afe"  # Replace with your API key
secret = "17840bf5a8"  
timestamp = str(int(time.time()))

signature = hashlib.sha256((api_key + secret + timestamp).encode('utf-8')).hexdigest()

print("X-Signature:", signature)

  # Replace with your API secret
