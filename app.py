# Flask와 관련 모듈을 임포트합니다.
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
# 데이터베이스 핸들러에서 필요한 함수들을 임포트합니다.
from DB_Handler import filter_by_category, filter_by_options, filter_each_menu_description

# Flask 애플리케이션을 초기화합니다.
app = Flask(__name__, static_folder='public')
# CORS 설정을 추가합니다. (Cross-Origin Resource Sharing을 허용하기 위함)
CORS(app)

# 특정 카테고리의 메뉴를 가져오는 엔드포인트를 정의합니다.
@app.route('/menu/<category>', methods=['GET'])
def get_menu(category):
    try:
        # DB 핸들러에서 카테고리별 메뉴를 필터링하는 함수를 호출합니다.
        menu_list = filter_by_category(category)
        # 필터링된 메뉴 리스트를 JSON 형식으로 반환합니다.
        return jsonify(menu_list), 200
    except Exception as e:
        # 예외가 발생하면 에러 메시지를 JSON 형식으로 반환합니다.
        return jsonify({"error": str(e)}), 500

# 모든 카테고리의 메뉴 리스트를 가져오는 엔드포인트를 정의합니다.
@app.route('/menu', methods=['GET'])
def get_all_menus():
    try:
        # 미리 정의된 카테고리 리스트를 사용합니다.
        categories = ["McCafe", "McMorning", "burger", "desserts", "drinks", "sides"]
        menu_list = []
        # 각 카테고리별로 타입, 라벨, 이미지 정보를 추가합니다.
        for category in categories:
            menu_list.append({
                "type": category,
                "label": category,
                "image": f"{category.lower()}.png"
            })
        # 모든 카테고리의 메뉴 리스트를 JSON 형식으로 반환합니다.
        return jsonify(menu_list), 200
    except Exception as e:
        # 예외가 발생하면 에러 메시지를 JSON 형식으로 반환합니다.
        return jsonify({"error": str(e)}), 500

# 정적 파일(자산)을 제공하는 엔드포인트를 정의합니다.
@app.route('/assets/<path:filename>')
def serve_assets(filename):
    # 'public/assets' 디렉토리에서 요청된 파일을 반환합니다.
    return send_from_directory('public/assets', filename)

# 옵션에 따라 메뉴를 필터링하는 엔드포인트를 정의합니다.
@app.route('/filter', methods=['GET'])
def filter_menu():
    try:
        # 요청 매개변수에서 기름기, 단단함, 매움의 값을 가져옵니다. 기본값은 5입니다.
        greasiness = int(request.args.get('greasiness', 5))
        hardness = int(request.args.get('hardness', 5))
        spiciness = int(request.args.get('spiciness', 5))
        # DB 핸들러에서 옵션별 메뉴를 필터링하는 함수를 호출합니다.
        filtered_menus = filter_by_options(greasiness, hardness, spiciness)
        # 필터링된 메뉴 리스트를 JSON 형식으로 반환합니다.
        return jsonify(filtered_menus), 200
    except Exception as e:
        # 예외가 발생하면 에러 메시지를 JSON 형식으로 반환합니다.
        return jsonify({"error": str(e)}), 500

# 특정 카테고리와 메뉴 이름에 대한 설명을 가져오는 엔드포인트를 정의합니다.
@app.route('/description/<category>/<menu_name>', methods=['GET'])
def get_menu_description(category, menu_name):
    try:
        # DB 핸들러에서 특정 메뉴 설명을 필터링하는 함수를 호출합니다.
        description = filter_each_menu_description(category, menu_name)
        # 설명이 존재하면 JSON 형식으로 반환합니다.
        if description:
            return jsonify(description), 200
        else:
            # 설명이 없으면 404 상태 코드와 에러 메시지를 반환합니다.
            return jsonify({"error": "Description not found"}), 404
    except Exception as e:
        # 예외가 발생하면 에러 메시지를 JSON 형식으로 반환합니다.
        return jsonify({"error": str(e)}), 500

# 애플리케이션이 독립 실행형으로 실행될 때 Flask 개발 서버를 시작합니다.
if __name__ == '__main__':
    app.run(debug=True)
