import os
import json
import ast

PACK_DIR = os.path.join(os.path.dirname(__file__), "problem-packs")

packs = {}

def add_p(pack_key, title, slug, desc, diff, time_lim, mem_lim, constr, inp_fmt, out_fmt, s_inp, s_out, pts, hints, py_code, js_code, app, algo, tc, sc, tags, tests):
    if pack_key not in packs:
        packs[pack_key] = []
    
    # Generate standard template from solution
    lines = py_code.strip().split('\n')
    header_line = lines[0] if len(lines) > 0 else 'class Solution:'
    method_line = lines[1] if len(lines) > 1 else '    def solve(self):'
    py_tmpl = f"{header_line}\n{method_line}\n        pass"
    
    js_lines = js_code.strip().split('\n')
    js_hdr = js_lines[0] if len(js_lines) > 0 else 'class Solution {'
    js_method = js_lines[1] if len(js_lines) > 1 else '    solve() {'
    js_tmpl = f"{js_hdr}\n{js_method}\n        \n    }}\n}}"

    test_case_objs = []
    for idx, (inp, out, hidden) in enumerate(tests):
        test_case_objs.append({
            "input": str(inp),
            "expectedOutput": str(out),
            "isHidden": bool(hidden),
            "order": idx
        })

    packs[pack_key].append({
        "title": title,
        "slug": slug,
        "description": desc,
        "difficulty": diff,
        "timeLimit": time_lim,
        "memoryLimit": mem_lim,
        "constraints": constr,
        "inputFormat": inp_fmt,
        "outputFormat": out_fmt,
        "sampleInput": s_inp,
        "sampleOutput": s_out,
        "points": pts,
        "hints": hints,
        "codeTemplates": {
            "python": py_tmpl,
            "javascript": js_tmpl
        },
        "referenceSolutions": {
            "python": py_code,
            "javascript": js_code
        },
        "editorial": {
            "approach": app,
            "algorithm": algo,
            "timeComplexity": tc,
            "spaceComplexity": sc,
            "content": f"{app}. Implements standard algorithm in {tc} time and {sc} auxiliary memory.",
            "referenceCode": py_code
        },
        "tags": tags,
        "testCases": test_case_objs
    })

print("Helper defined.")
