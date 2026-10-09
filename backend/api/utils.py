import os
import requests

PAYSTACK_SECRET_KEY = os.getenv('PAYSTACK_SECRET_KEY')

def initialize_paystack_payment(email: str, amount_in_naira: float, campaign_id: str = None):
    url = "https://api.paystack.co/transaction/initialize"
    headers = {
        "Authorization": f"Bearer {PAYSTACK_SECRET_KEY}",
        "Content-Type": "application/json",
    }
    # Paystack amount is in Kobo (Naira * 100)
    data = {
        "email": email,
        "amount": int(amount_in_naira * 100),
        "metadata": {
            "campaign_id": campaign_id
        }
    }
    response = requests.post(url, json=data, headers=headers)
    return response.json()


def verify_paystack_payment(reference: str):
    url = f"https://api.paystack.co/transaction/verify/{reference}"
    headers = {
        "Authorization": f"Bearer {PAYSTACK_SECRET_KEY}",
    }
    response = requests.get(url, headers=headers)
    return response.json()