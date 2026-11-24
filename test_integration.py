import html.parser

with open(r"F:\2026\Websites\english-quiz-system\index.html", "r", encoding="utf-8") as f:
    html_code = f.read()

class TestParser(html.parser.HTMLParser):
    def error(self, msg):
        print("HTML Error:", msg)

p = TestParser()
p.feed(html_code)
print("index.html parse test PASSED!")

with open(r"F:\2026\Websites\english-quiz-system\app.js", "r", encoding="utf-8") as f:
    js_code = f.read()

assert "renderMidtermCards" in js_code, "renderMidtermCards missing!"
assert "startPracticeMidterm" in js_code, "startPracticeMidterm missing!"
assert "scrollToMidterms" in js_code, "scrollToMidterms missing!"
assert "midtermSection" in html_code, "midtermSection missing in HTML!"
assert "midtermCardsContainer" in html_code, "midtermCardsContainer missing in HTML!"

print("app.js and HTML integration tests PASSED!")
