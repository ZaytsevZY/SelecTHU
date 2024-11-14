from django.shortcuts import render
from django.http import JsonResponse
from db.v1 import views as db_views

# 测试接口连接
@require_http_methods(["GET"])
def status(request):
    """
    测试接口连接
    """
    return JsonResponse({
        "status": 200,
        "message": "connect successfully"
    })