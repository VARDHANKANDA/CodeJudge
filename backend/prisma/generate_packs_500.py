import os
import json

PACK_DIR = os.path.join(os.path.dirname(__file__), "problem-packs")

packs = {}

def add_problem(pack_key, title, slug, description, difficulty, time_limit, memory_limit, constraints, input_format, output_format, sample_input, sample_output, points, hints, py_template, js_template, py_solution, js_solution, approach, algorithm, time_comp, space_comp, tags, test_cases):
    if pack_key not in packs:
        packs[pack_key] = []
    packs[pack_key].append({
        "title": title,
        "slug": slug,
        "description": description,
        "difficulty": difficulty,
        "timeLimit": time_limit,
        "memoryLimit": memory_limit,
        "constraints": constraints,
        "inputFormat": input_format,
        "outputFormat": output_format,
        "sampleInput": sample_input,
        "sampleOutput": sample_output,
        "points": points,
        "hints": hints,
        "codeTemplates": {
            "python": py_template,
            "javascript": js_template
        },
        "referenceSolutions": {
            "python": py_solution,
            "javascript": js_solution
        },
        "editorial": {
            "approach": approach,
            "algorithm": algorithm,
            "timeComplexity": time_comp,
            "spaceComplexity": space_comp,
            "content": f"{approach} using standard algorithms.",
            "referenceCode": py_solution
        },
        "tags": tags,
        "testCases": test_cases
    })

print("Configuring 247 problems across 13 packs...")
