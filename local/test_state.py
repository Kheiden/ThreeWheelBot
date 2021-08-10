import local.state
import sys

def test_baseline():
  assert 1 == 1

def test_create_nav_object():
  current_state = local.state.State()
  new_path = current_state.add_path()
  path_time = new_path.command_start_time.unix_timestamp_seconds
  assert path_time > 0

def test_save_nav_obj():
  current_state = local.state.State()
  new_path = current_state.add_path()
  path_time = new_path.command_start_time.unix_timestamp_seconds
  result = current_state.save_navigation_path()
  assert result

def test_load_nav_obj():
  current_state = local.state.State()
  nav_path = current_state.load_nav_path()
  print(nav_path)
  assert nav_path
