from queryDB import *
from modifyDB import *


def help():
    """
    返回帮助信息（关于v1版本的数据库操作的api）
    """
    import queryDB
    import inspect
    # 获取所有函数
    funcs = inspect.getmembers(queryDB, inspect.isfunction)
    # 获取函数名和参数
    functions = {}
    for func_name, func in funcs:
        argument = inspect.signature(func).parameters
        functions[func_name] = argument
    # 打印帮助信息
    print("v1版本数据库操作api：")
    for func_name, argument in functions.items():
        print(f" - {func_name}({', '.join(argument)})")
    return