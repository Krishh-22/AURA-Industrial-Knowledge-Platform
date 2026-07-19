from app.services.gemini_service import gemini_service

text = """
Industrial pumps should be inspected every month.
Bearings must be lubricated regularly.
Any leakage should be reported immediately.
"""

summary=gemini_service.summarize_document(text)

print(summary)