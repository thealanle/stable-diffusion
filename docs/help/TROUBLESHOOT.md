---
title: F.A.Q.
hide:
  - toc
---

# :material-frequently-asked-questions: F.A.Q.

## **Frequently-Asked-Questions**

Here are a few common installation problems and their solutions. Often these are caused by
incomplete installations or crashes during the install process.

---

### **QUESTION**

During `conda env create`, conda hangs indefinitely.

If it is because of the last PIP step (usually stuck in the Git Clone step, you can check the detailed log by this method):
```bash
export PIP_LOG="/tmp/pip_log.txt"
touch ${PIP_LOG}
tail -f ${PIP_LOG} & 
conda env create -f environment-mac.yaml --debug --verbose
killall tail
rm ${PIP_LOG}
```

**SOLUTION**

Conda sometimes gets stuck  at the last PIP step, in which several git repositories are
cloned and built.

Enter the stable-diffusion directory and completely remove the `src`
directory and all its contents.  The safest way to do this is to enter
the stable-diffusion directory and give the command `git clean -f`. If
this still doesn't fix the problem, try "conda clean -all" and then
restart at the `conda env create` step.

To further understand the problem to checking the install lot using this method:

```bash
export PIP_LOG="/tmp/pip_log.txt"
touch ${PIP_LOG}
tail -f ${PIP_LOG} & 
conda env create -f environment-mac.yaml --debug --verbose
killall tail
rm ${PIP_LOG}
```

---

### **QUESTION**

`invoke.py` crashes with the complaint that it can't find `ldm.simplet2i.py`. Or it complains that
function is being passed incorrect parameters.

### **SOLUTION**

Reinstall the stable diffusion modules. Enter the `stable-diffusion` directory and give the command
`pip install -e .`

---

### **QUESTION**

`invoke.py` dies, complaining of various missing modules, none of which starts with `ldm`.

### **SOLUTION**

From within the `InvokeAI` directory, run `conda env update` This is also frequently the solution to
complaints about an unknown function in a module.

---

### **QUESTION**

There's a feature or bugfix in the Stable Diffusion GitHub that you want to try out.

### **SOLUTION**

#### **Main Branch**

If the fix/feature is on the `main` branch, enter the stable-diffusion directory and do a
`git pull`.

Usually this will be sufficient, but if you start to see errors about
missing or incorrect modules, use the command `pip install -e .`
and/or `conda env update` (These commands won't break anything.)

`pip install -e .` and/or `conda env update -f environment.yaml`

(These commands won't break anything.)

#### **Sub Branch**

If the feature/fix is on a branch (e.g. "_foo-bugfix_"), the recipe is similar, but do a
`git pull <name of branch>`.

#### **Not Committed**

If the feature/fix is in a pull request that has not yet been made part of the main branch or a
feature/bugfix branch, then from the page for the desired pull request, look for the line at the top
that reads "_xxxx wants to merge xx commits into lstein:main from YYYYYY_". Copy the URL in YYYY. It
should have the format

`https://github.com/<name of contributor>/stable-diffusion/tree/<name of branch>`

Then **go to the directory above stable-diffusion** and rename the directory to
"_stable-diffusion.lstein_", "_stable-diffusion.old_", or anything else. You can then git clone the
branch that contains the pull request:

`git clone https://github.com/<name of contributor>/stable-diffusion/tree/<name of branch>`

You will need to go through the install procedure again, but it should be fast because all the
dependencies are already loaded.

---

### **QUESTION**

Image generation crashed with CUDA out of memory error after successful sampling. 

### **SOLUTION**

Try to run script with option `--free_gpu_mem` This will free memory before image decoding step.
