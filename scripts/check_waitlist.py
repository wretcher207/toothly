"""Check the public landing page and database without creating a signup."""
import json
import re
import urllib.request


def check():
    with urllib.request.urlopen("https://toothly.deadpixeldesign.com/", timeout=30) as response:
        html = response.read().decode()
    url = re.search(r"const SB_URL = '([^']+)'", html).group(1)
    key = re.search(r"const SB_KEY = '([^']+)'", html).group(1)
    assert url == "https://ltamlswdkckutchlffkb.supabase.co", "Wrong database project"
    request = urllib.request.Request(
        url + "/rest/v1/rpc/toothly_health",
        headers={"apikey": key},
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        assert json.load(response) is True, "Database health check failed"
    print("Toothly landing page and database are reachable.")


if __name__ == "__main__":
    check()
